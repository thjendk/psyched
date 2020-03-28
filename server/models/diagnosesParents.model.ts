import { Model } from 'objection';

interface DiagnosisParent {
  diagnosisId: number;
  parentId: number;
  userId: number;
}

class DiagnosisParent extends Model {
  static tableName = 'diagnosesParents';
  static idColumn = ['diagnosisId', 'parentId'];
}

export default DiagnosisParent;
