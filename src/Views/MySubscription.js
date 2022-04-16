import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { w, h } from "react-native-responsiveness";
import {
  StripeProvider,
  CardField,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import CustomAuthBtn from "../Components/CustomAuthBtn";
import { inputBg, mainColor, screenBg } from "../AppColors";
const API_URL = "http://localhost:3000";
import { useSelector } from "react-redux";
import axios from "axios";
import Plans from "../Components/Plans";
const MySubscription = ({ navigation }) => {
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth === null || !isAuth) {
      navigation.replace("Auth");
    }
  }, []);

  const email = isAuth.email;
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [selectedPlan, setselectedPlan] = useState({
    title: "",
    price: 0,
    usercapcity: 0,
  });
  console.log(selectedPlan);
  const fetchPaymentIntentClientSecret = async () => {
    const response = await axios.post(`${API_URL}/create-payment-intent`, {
      price: 1200,
    });
    // const response = await fetch(, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };
  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      alert(`error ${e}`);
    }
    //3.Confirm the payment with the card details
  };
  const onPressFun = (data) => {
    setselectedPlan(data);
  };
  return (
    <StripeProvider publishableKey="pk_test_51KohzCSGXTS5PtLwr6d0UhXOAqtXcJa7qlMZS8F9gEeLUse7SvB3rDufuD87IyTJF52jhnt69xx2bvL2Dyl0LHlT00b8eS3eEB">
      <SafeAreaView style={styles.container}>
        <View style={styles.flexwrapdiv}>
          <Plans
            value={selectedPlan.title}
            title={"Basic Plan"}
            usercapcity={10}
            price={10}
            onClick={onPressFun}
          />
          <Plans
            value={selectedPlan.title}
            title={"Super Plan"}
            usercapcity={30}
            price={25}
            onClick={onPressFun}
          />
        </View>
        <View style={styles.inputscont}>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
          <CustomAuthBtn title={"Buy"} onClick={handlePayPress} />
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};
export default MySubscription;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: screenBg,
    display: "flex",
    // alignItems: "center",
    justifyContent: "space-evenly",
    // flexDirection: "column",
  },
  input: {
    backgroundColor: inputBg,
    borderRadius: 8,
    fontSize: h("2%"),
    height: h("5%"),
    padding: 10,
    borderRadius: h("2%"),
  },
  card: {
    backgroundColor: inputBg,
  },
  cardContainer: {
    height: h("6%"),
    width: w("95%"),
    alignSelf: "center",
    borderRadius: h("2%"),
    overflow: "hidden",
  },
  flexwrapdiv: {
    width: "100%",
    height: h("40%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  inputscont: {
    width: "100%",
    height: h("30%"),
    display: "flex",
    justifyContent: "space-evenly",
  },
});
