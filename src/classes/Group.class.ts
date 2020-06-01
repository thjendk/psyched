import { SymptomGroupInput, GroupInput, Group as GroupType } from 'types/generated';
import { gql } from 'apollo-boost';
import Diagnosis from './Diagnosis.class';
import Apollo from './Apollo';
import diagnosisReducer from 'redux/reducers/diagnoses.reducer';
import { store } from 'index';
import groupsReducer from 'redux/reducers/groups.reducer';
import Symptom from './Symptom.class';

interface Group extends GroupType {}

class Group {
  static fragment = gql`
    fragment Group on Group {
      id
      name
      index
      symptoms {
        ...Symptom
      }
      children {
        id
      }
      parent {
        id
      }
    }
    ${Symptom.fragment}
  `;

  static addOrRemove = async (data: GroupInput) => {
    const mutation = gql`
      mutation AddOrRemoveGroup($data: GroupInput) {
        addOrRemoveGroup(data: $data) {
          ...Diagnosis
        }
      }
      ${Diagnosis.fragment}
    `;

    try {
      const diagnosis = await Apollo.mutate<Diagnosis>('addOrRemoveGroup', mutation, { data });
      await Group.fetchAll();
      store.dispatch(diagnosisReducer.actions.addDiagnosis(diagnosis));
    } catch (error) {}
  };

  static fetchAll = async () => {
    const query = gql`
      query Groups {
        groups {
          ...Group
        }
      }
      ${Group.fragment}
    `;

    const groups = await Apollo.query<Group[]>('groups', query);
    return store.dispatch(groupsReducer.actions.addGroups(groups));
  };

  static addSymptom = async (data: SymptomGroupInput) => {
    const mutation = gql`
      mutation SymptomGroup($data: SymptomGroupInput) {
        symptomGroup(data: $data) {
          ...Group
        }
      }
      ${Group.fragment}
    `;

    const group = await Apollo.mutate<Group>('symptomGroup', mutation, { data });
    store.dispatch(groupsReducer.actions.addGroups(group));
  };
}

export default Group;
