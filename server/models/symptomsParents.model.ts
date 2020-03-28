import { Model } from 'objection';

interface SymptomParent {
  symptomId: number;
  parentId: number;
  userId: number;
}

class SymptomParent extends Model {
  static tableName = 'symptomsParents';
  static idColumn = ['symptomId', 'diagnosisId'];
}

export default SymptomParent;
