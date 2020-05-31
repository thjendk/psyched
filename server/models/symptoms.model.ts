import { Model } from 'objection';

interface Symptoms {
  id: number;
  name: string;
  description: string;
  parentId: number;
}

class Symptoms extends Model {
  static tableName = 'symptoms';
}

export default Symptoms;
