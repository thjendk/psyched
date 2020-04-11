import React, { useState, useContext } from 'react';
import Symptom from 'classes/Symptom.class';
import { Popup, Modal, Icon, Button, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Diagnosis from 'classes/Diagnosis.class';
import SymptomTagPoints from './SymptomTagPoints';
import { DiagnosisSymptom } from 'types/generated';
import { DiagnosisContext } from './DiagnosisTable';
import SymptomTagChildren from './SymptomTagChildren';
import styled from 'styled-components';

export const Tag = styled.span<{ active?: boolean; notParent?: boolean }>`
  border-radius: 5px;
  background-color: ${(props) =>
    props.active ? '#0089e0' : props.notParent ? '#ffdd8f' : 'white'};
  padding: 3px 10px;
  color: ${(props) => (props.active ? 'white' : 'black')};
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
  border: ${(props) => (props.active ? '1px solid white' : '1px dashed black')};
  white-space: nowrap;

  :hover {
    border: 1px solid black;
  }
`;

export interface SymptomTagProps {
  symptom?: Symptom;
  diagnosisSymptom?: DiagnosisSymptom;
  style?: any;
  excess?: boolean;
  hideChildren?: boolean;
  hidden?: boolean;
}

const SymptomTag: React.SFC<SymptomTagProps> = ({
  symptom,
  style,
  diagnosisSymptom,
  excess,
  hideChildren,
  hidden
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const shouldHide = useSelector((state: ReduxState) => state.settings.shouldHide);
  const diagnosis = useContext(DiagnosisContext);
  const s = symptom || diagnosisSymptom.symptom;
  const belongs = !!diagnosisSymptom;
  const isHidden = (diagnosisSymptom?.hidden || hidden) && shouldHide;

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  const toggleHideSymptom = async () => {
    setHiding(true);
    await Diagnosis.toggleHideSymptom(diagnosis.id, symptom?.id || diagnosisSymptom.symptom.id);
    setHiding(false);
  };

  const handleRemoveSymptom = async (id: number) => {
    setRemoveLoading(true);
    await Diagnosis.removeSymptom(diagnosis.id, id);
    setModalOpen(false);
    setRemoveLoading(false);
  };

  if (excess) {
    if (diagnosisSymptom?.point < 0)
      return (
        <SymptomTag
          diagnosisSymptom={diagnosisSymptom}
          hideChildren
          style={{
            backgroundColor: 'red',
            color: 'white'
          }}
        />
      );
    return (
      <SymptomTag
        symptom={s}
        hideChildren
        style={{
          backgroundColor: '#870000',
          color: 'white'
        }}
      />
    );
  }
  if (isHidden) return <SymptomTagChildren isHidden parent={s} />;
  return (
    <Popup
      key={s.id}
      position="top center"
      disabled={!s.description}
      trigger={
        <Tag
          hidden={isHidden}
          notParent={belongs && !diagnosisSymptom?.hidden}
          style={style}
          active={symptomIds.includes(s.id)}
        >
          <span onClick={() => handlePick(s.id)}>{s.name.toTitleCase()}</span>
          {user && belongs && (
            <>
              <Modal
                open={modalOpen}
                trigger={
                  <Icon
                    style={{ marginLeft: '4px' }}
                    color="grey"
                    onClick={() => setModalOpen(true)}
                    name="close"
                  />
                }
              >
                <Modal.Header>
                  Vil du fjerne {s.name} fra {diagnosis.name}?
                </Modal.Header>
                <Modal.Actions>
                  <Button basic color="black" onClick={() => setModalOpen(false)}>
                    <Icon name="close" /> Nej
                  </Button>
                  <Button
                    basic
                    color="red"
                    loading={removeLoading}
                    disabled={removeLoading}
                    onClick={() => handleRemoveSymptom(s.id)}
                  >
                    <Icon name="trash" /> Ja
                  </Button>
                </Modal.Actions>
              </Modal>
            </>
          )}
          <SymptomTagPoints diagnosis={diagnosis} symptom={diagnosisSymptom} />
          {user && (
            <Icon
              style={{ marginLeft: '4px' }}
              color="grey"
              onClick={toggleHideSymptom}
              name={diagnosisSymptom?.hidden ? 'eye' : 'eye slash outline'}
            />
          )}
          {hiding && <Loader inline active size="tiny" />}
          {!hideChildren && <SymptomTagChildren parent={s} />}
        </Tag>
      }
    >
      {s.description}
    </Popup>
  );
};

export default SymptomTag;
