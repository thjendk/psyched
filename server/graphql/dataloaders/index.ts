import DataLoader from 'dataloader';
import User from 'models/userModel';
import Diagnoses from 'models/diagnoses.model';
import Symptoms from 'models/symptoms.model';
import Group from 'models/groups.model';

const batchUsers = async (ids: number[]) => {
  const users = await User.query().findByIds(ids);
  return ids.map((id) => users.find((user) => user.id === id));
};
const batchDiagnoses = async (ids: number[]) => {
  const diagnoses = await Diagnoses.query().findByIds(ids);
  return ids.map((id) => diagnoses.find((d) => d.id === id));
};
const batchSymptoms = async (ids: number[]) => {
  const symptoms = await Symptoms.query().findByIds(ids);
  return ids.map((id) => symptoms.find((s) => s.id === id));
};
const batchGroups = async (ids: number[]) => {
  const groups = await Group.query().findByIds(ids);
  return ids.map((id) => groups.find((g) => g.id === id));
};

const generateUserLoader = () => new DataLoader((ids: number[]) => batchUsers(ids));
const generateDiagnosisLoader = () => new DataLoader((ids: number[]) => batchDiagnoses(ids));
const generateSymptomLoader = () => new DataLoader((ids: number[]) => batchSymptoms(ids));
const generateGroupLoader = () => new DataLoader((ids: number[]) => batchGroups(ids));

export const generateLoaders = () => ({
  userLoader: generateUserLoader(),
  diagnosisLoader: generateDiagnosisLoader(),
  symptomLoader: generateSymptomLoader(),
  groupLoader: generateGroupLoader()
});
