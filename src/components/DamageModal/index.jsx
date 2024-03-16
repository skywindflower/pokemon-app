import React from 'react';
import styled from 'styled-components';
import { typeColor } from '../../api/dataFormat';

const DamageModal = ({ damageInfo, setIsOpen }) => {
  const { double_damage_from, half_damage_from, no_damage_from } =
    damageInfo[0];

  return (
    <ModalContainer>
      <Modal>
        <Title>
          <h2>데미지 관계</h2>
          <Close onClick={() => setIsOpen(false)}>X</Close>
        </Title>
        <Content>
          <p>Weak</p>
          <TypeContainer>
            {double_damage_from.length > 0 ? (
              double_damage_from.map((item, index) => {
                const backgroundColor = typeColor(item.name);
                return (
                  <Type $backgroundColor={backgroundColor} key={index}>
                    {item.name}
                    <span>2x</span>
                  </Type>
                );
              })
            ) : (
              <Type $backgroundColor={'lightgray'}>none</Type>
            )}
          </TypeContainer>
          <p>Resistent</p>
          <TypeContainer>
            {half_damage_from.length > 0 ? (
              half_damage_from.map((item, index) => {
                const backgroundColor = typeColor(item.name);
                return (
                  <Type $backgroundColor={backgroundColor} key={index}>
                    {item.name}
                    <span>1/2x</span>
                  </Type>
                );
              })
            ) : (
              <Type $backgroundColor={'lightgray'}>none</Type>
            )}
          </TypeContainer>
          <p>Immune</p>
          <TypeContainer>
            {no_damage_from.length > 0 ? (
              no_damage_from.map((item, index) => {
                const backgroundColor = typeColor(item.name);
                return (
                  <Type $backgroundColor={backgroundColor} key={index}>
                    {item.name}
                    <span>0</span>
                  </Type>
                );
              })
            ) : (
              <Type $backgroundColor={'lightgray'}>none</Type>
            )}
          </TypeContainer>
        </Content>
      </Modal>
    </ModalContainer>
  );
};

export default DamageModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0px;
  background-color: rgb(23, 25, 36);
  -webkit-tap-highlight-color: transparent;
  display: flex;
  justify-content: center;
  z-index: 900;
`;

const Modal = styled.div`
  max-width: 50%;
  position: absolute;
  box-shadow: 5px 5px 5px black;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 10px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

const Close = styled.div`
  padding: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1000;
  color: black;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 50px;
  gap: 5px;

  & > p {
    font-size: 1.2rem;
    margin-top: 10px;
  }
`;

const TypeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px auto;
`;

const Type = styled.p`
  color: black;
  padding: 5px 12px;
  border-radius: 25px;
  font-size: 0.8rem;
  text-align: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  & > span {
    margin-left: 2px;
    background-color: rgb(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`;
