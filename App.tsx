import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import styled from '@emotion/native';

const COLOR_ITEM = 'color';
const SUITE_NAME = 'group.app.backlinks';

DefaultPreference.setName(SUITE_NAME);

type ColorProps = {
  color: string;
};

const Color = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${(props: ColorProps) =>
    props.color ? props.color : null};
  border: 1px solid black;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  border: 1px solid black;
  padding-left: 10px;

  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: black;
  height: 50px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 30px;
`;

type ButtonProps = {
  title: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({title, onPress}) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);

const App: React.FC = () => {
  const [color, setColor] = useState('');
  const [newColor, setNewColor] = useState('');

  useEffect(() => {
    DefaultPreference.get(COLOR_ITEM).then(_color => {
      setColor(_color);
      setNewColor(_color);
    });
  }, []);

  const onPress = async () => {
    await DefaultPreference.set(COLOR_ITEM, newColor);
    setColor(newColor);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Container>
          <Color color={color} />
          <Input
            value={newColor}
            onChangeText={setNewColor}
            autoCapitalize="none"
          />
          <Button title="submit" onPress={onPress} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
