import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import Svg, { Circle, SvgXml } from "react-native-svg";
import { w, h } from "react-native-responsiveness";
const AnimatedTimeComp = () => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const handleAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: false,
      }),
      { iterations: 500000 }
    ).start(() => {
      rotateAnimation.setValue(0);
    });
  };
  useEffect(() => {
    handleAnimation();
  }, []);

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  const mysvg = `<svg
      width="187"
      height="187"
      viewBox="0 0 187 187"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M95.4707 186.029C44.3682 187.118 2.05912 146.573 0.970721 95.4707C-0.117683 44.3682 40.4268 2.05916 91.5293 0.970751C142.632 -0.117652 184.941 40.4268 186.029 91.5293C187.118 142.632 146.573 184.941 95.4707 186.029ZM91.9234 19.4766C51.0414 20.3473 18.6059 54.1946 19.4766 95.0766C20.3473 135.959 54.1946 168.394 95.0766 167.523C135.959 166.653 168.394 132.805 167.523 91.9234C166.653 51.0414 132.805 18.6059 91.9234 19.4766Z"
        fill="#E9E9E9"
      />
      <path
        d="M94.6202 177.308C94.6718 179.734 96.6814 181.669 99.1009 181.496C114.913 180.367 130.155 174.977 143.19 165.86C157.427 155.902 168.391 141.946 174.696 125.757C181.002 109.568 182.365 91.8728 178.613 74.9091C174.862 57.9454 166.164 42.475 153.62 30.4544C141.077 18.4338 125.25 10.4028 108.142 7.377C91.0339 4.35118 73.4128 6.46645 57.5069 13.4553C41.601 20.4442 28.1247 31.9928 18.7822 46.6406C10.2285 60.0519 5.49179 75.5097 5.03691 91.3556C4.96731 93.7803 6.98664 95.7056 9.41179 95.6539C11.8369 95.6023 13.7483 93.5932 13.8314 91.1689C14.3148 77.0612 18.569 63.3106 26.1883 51.3643C34.5966 38.1812 46.7252 27.7875 61.0405 21.4975C75.3558 15.2075 91.2149 13.3038 106.612 16.027C122.009 18.7502 136.253 25.9781 147.543 36.7967C158.832 47.6152 166.66 61.5385 170.036 76.8059C173.413 92.0732 172.186 107.999 166.511 122.569C160.836 137.139 150.968 149.699 138.155 158.661C126.544 166.782 112.987 171.618 98.913 172.702C96.4944 172.888 94.5685 174.883 94.6202 177.308Z"
        fill="#0085FF"
      />
    </svg>`;
  return (
    <View style={{ position: "relative", height: "40%" }}>
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          ...animatedStyle,
        }}
      >
        <SvgXml xml={mysvg} width="100%" height="100%" />
      </Animated.View>
      <View
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: h("3%") }}>17:14:44</Text>
      </View>
    </View>
  );
};

export default AnimatedTimeComp;

const styles = StyleSheet.create({});
