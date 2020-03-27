import { Model } from 'objection';

interface Diagnoses {
  diagnosisId: number;
  name: string;
  description: string;
}

class Diagnoses extends Model {
  static tableName = 'diagnoses';
  static idColumn = 'diagnosisId';
}

export default Diagnoses;
