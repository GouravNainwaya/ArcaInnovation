
import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, TextInput, View, Button } from 'react-native';

function AnimatedInput({ value, onChange, placeholder, multiline, ...props }) {
    const [inputHeight, setHeight] = useState(null);
    const [placeholderWidth, setWidth] = useState(null);
    const animation = useRef(new Animated.Value(0)).current;
    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -inputHeight / 2],
    });
    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -placeholderWidth / 4],
    });
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
    });
    const onFocus = () => animate(1);
    const onBlur = () => !value && animate(0);
    const animate = val => {
        Animated.spring(animation, {
            toValue: val,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View
            style={styles.inputContainer}
            onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
            <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
                <Animated.Text
                    style={[
                        styles.placeholder,
                        { transform: [{ translateY }, { translateX }, { scale }] },
                    ]}
                    onTextLayout={e =>
                        !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
                    }>
                    {placeholder}
                </Animated.Text>
            </View>
            <TextInput
                style={[
                    styles.input,
                    multiline && { height: 100, textAlignVertical: 'top' },
                ]}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={multiline}
                {...props}
            />
        </View>
    );
}

const AddEmployee = ({ navigation, route }) => {
    const { setApiData, apiData } = route?.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [parentId, setParentId] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [address, setAddress] = useState('');
  
    const newElement = {
      name,
      email,
      phone,
      parentId,
      backgroundColor,
      address,
      id: apiData.length + 1,
    };
  
    const isDataValid = () => {
      // Basic input validation checks
      if (!name || !email || !phone || !parentId || !backgroundColor || !address) {
        alert('Please fill in all fields');
        return false;
      }
      return true;
    };
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <AnimatedInput value={name} onChange={setName} placeholder="Name" />
          <AnimatedInput value={email} onChange={setEmail} placeholder="Email" />
          <AnimatedInput
            value={phone}
            keyboardType="numeric"
            onChange={setPhone}
            placeholder="Phone"
          />
          <AnimatedInput value={parentId} onChange={setParentId} placeholder="Parent ID" />
          <AnimatedInput
            value={backgroundColor}
            onChange={setBackgroundColor}
            placeholder="Background Color"
          />
          <AnimatedInput value={address} onChange={setAddress} placeholder="Address" multiline />
        </ScrollView>
        <Button
          title="Save"
          onPress={() => {
            if (isDataValid()) {
              setApiData((prevData) => [...prevData, newElement]);
              navigation.goBack();
            }
          }}
        />
      </View>
    );
  };
  
  export default AddEmployee;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#060418'
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#999',
        marginBottom: 25,
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 18,
    },
    placeholderContainer: {
        position: 'absolute',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    placeholder: {
        fontSize: 22,
        position: 'absolute',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        // backgroundColor: '#fff',
        color: '#999',
    },
});