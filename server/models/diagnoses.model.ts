import { Model } from 'objection';

interface Diagnoses {
  id: number;
  name: string;
  description: string;
  icdCode: string;
}

class Diagnoses extends Model {
  static tableName = 'diagnoses';
}

export default Diagnoses;
