import { Schema, model, models } from 'mongoose';

const quizzSchema = new Schema({
  language: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [{
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: Boolean,
      required: true,
    },
  }],
});

const Quizz = models['quizzquestion'] || model('quizzquestion', quizzSchema);

export default Quizz;
