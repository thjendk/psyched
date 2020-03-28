import { Model } from 'objection';

interface Diagnoses {
  diagnosisId: number;
  name: string;
  description: string;
  icdCode: string;
  userId: number;
}

class Diagnoses extends Model {
  static tableName = 'diagnoses';
  static idColumn = 'diagnosisId';
}

export default Diagnoses;
