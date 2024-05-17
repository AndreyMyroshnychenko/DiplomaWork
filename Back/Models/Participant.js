import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const participantSchema = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(validatePass) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validatePass);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: { type: String, required: true },
}, {
  timestamps: true 
});

participantSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

participantSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Participant = model('Participant', participantSchema);

export default Participant;
