import { Model } from 'objection';

interface Diagnoses {
  id: number;
  name: string;
  description: string;
  icdCode: string;
  parentId: number;
}

class Diagnoses extends Model {
  static tableName = 'diagnoses';
}

export default Diagnoses;
