import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bgbgtuzmfngfwzuvmekt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYmd0dXptZm5nZnd6dXZtZWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0ODk2ODUsImV4cCI6MjAzMjA2NTY4NX0.l3kKgZpxY_hNE6qVaZIK-Uwn4LsdlBEtwzcCqNd2o04';
const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('Participant')
        .select('*')
        .eq('name', username)
        .eq('password', password);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (data.length > 0) {
        res.json({ success: true, username });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        const { data: insertData, error: insertError } = await supabase
            .from('Participant')
            .insert([{ name: username, email, password }]);
        
        if (insertError) {
            return res.status(500).json({ error: insertError.message });
        }

        const { data: userData, error: userError } = await supabase
            .from('Participant')
            .select('id, name, email')
            .eq('name', username);

        if (userError) {
            return res.status(500).json({ error: userError.message });
        }

        if (userData.length > 0) {
            const user = userData[0];
            res.json({ success: true, user });
        } else {
            res.status(500).json({ error: 'User data not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/rooms', async (req, res) => {
    const { company, country } = req.query;
    console.log(company, country);
    try {
        const { data: rooms, error } = await supabase
            .from('Room')
            .select(`*`)
            .ilike('company', company)  
            .ilike('country', country);  

        if (error) {
            throw error;
        }

        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching rooms');
    }
});
app.post('/api/bookings', async (req, res) => {
    const newBooking = req.body;
    try {
        const participants = await supabase
        .from('Participant')
        .select('id')
        .ilike('name', newBooking.participant_id)
        console.log(participants)
        const roomy=await supabase
        .from('Room')
        .select('id')
        .ilike('name', newBooking.room_name)
        console.log(roomy)

        const { data, error } = await supabase
            .from('Booking')
            .insert([{notes:newBooking.notes, start_time:newBooking.start_time, end_time:newBooking.end_time, participant_id:participants.data[0].id, 
                room_id:roomy.data[0].id}]);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
});


app.put('/api/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;
    const updatedData = req.body;

    try {
        const { data: participantsData, error: participantsError } = await supabase
            .from('Participant')
            .select('id')
            .ilike('name', updatedData.participant_id);

        if (participantsError || participantsData.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        const { data: roomData, error: roomError } = await supabase
            .from('Room')
            .select('id')
            .ilike('name', updatedData.room_name);

        if (roomError || roomData.length === 0) {
            return res.status(404).json({ error: 'Room not found' });
        }

        const participantId = participantsData[0].id;
        const roomId = roomData[0].id;

        const { data, error } = await supabase
            .from('Booking')
            .update({ 
                notes: updatedData.notes, 
                start_time: updatedData.start_time, 
                end_time: updatedData.end_time, 
                participant_id: participantId, 
                room_id: roomId 
            })
            .eq('id', bookingId);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/bookings/:id', async (req, res) => {
    const bookingId = req.params.id;

    try {
        const { data, error } = await supabase
            .from('Booking')
            .delete()
            .eq('id', bookingId);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static(path.join(path.resolve(), 'Front')));

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'Front', 'html', 'mainPage.html'));
});

app.get('/:filename', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'Front', 'html', req.params.filename));
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
