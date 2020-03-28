import { Model } from 'objection';

interface Symptoms {
  symptomId: number;
  name: string;
  description: string;
  userId: number;
}

class Symptoms extends Model {
  static tableName = 'symptoms';
  static idColumn = 'symptomId';
}

export default Symptoms;
