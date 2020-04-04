import React from 'react';
import { colors } from 'utils/utils';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';
import HideToggle from './HideToggle';

const ColorBox = styled.div`
  height: 15px;
  width: 15px;
  background-color: ${(props) => props.color};
  border: 1px dashed black;
`;

export interface ColorDescriptionProps {}

const ColorDescription: React.SFC<ColorDescriptionProps> = () => {
  const create = () => {
    let r = [];
    for (let key in colors) {
      const item = colors[key];
      r.push(
        <Popup
          position="top center"
          trigger={<ColorBox style={{ marginLeft: '5px' }} color={item.color} />}
        >
          {item.description}
        </Popup>
      );
    }
    return r;
  };

  return (
    <div
      style={{
        display: 'flex',
        margin: '1rem auto',
        justifyContent: 'center',
        alignItems: 'middle'
      }}
    >
      {create()} <HideToggle />
    </div>
  );
};

export default ColorDescription;
