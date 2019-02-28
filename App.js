import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Icon,
  Label,
  Item,
  Picker,
  Form,
  DatePicker,
  Grid,
  Col,
  Row
} from "native-base";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trialType: undefined,
      arrestDate: new Date(),
      thirtyDays: undefined,
      recaptureWindow: undefined,
      speedyTrial: undefined
    };
    this.setArrestDate = this.setArrestDate.bind(this);
  }

  calculateDates() {
    console.debug("Hello");
    /*
    Calendar selectedCalendar = Calendar.getInstance();
    	
    	selectedCalendar.setTime(today);
    	    	
    	int days = 175;
    	
    	String trialType = spTrialType.getSelectedItem().toString(); 
    	if (trialType.equals("Misdemeanour"))
    		days = 90;
    	    	    	
    	
    	Date thirtyDays = new Date(selectedCalendar.getTimeInMillis() + 30 * ONE_DAY );
    	Date recapture = new Date(selectedCalendar.getTimeInMillis() + (15 * ONE_DAY));
    	Date speedy = new Date(selectedCalendar.getTimeInMillis() + (days * ONE_DAY));
    	
    	tx30Day.setText(sdf.format(thirtyDays));
    	txRecapWindow.setText(sdf.format(recapture));
      txSpeedyLimit.setText(sdf.format(speedy));    
      */
    if (this.state.trialType && this.state.arrestDate) {
      let arrestDate = this.state.arrestDate;
      let days = 175;

      if (this.state.trialType == "M") days = 90;
      console.log("days to add = " + days);
      console.log("arrest date = " + arrestDate);
      let thirty = this.addDays(arrestDate, 30);
      let recapture = this.addDays(arrestDate, 15);
      let speedy = this.addDays(arrestDate, days);
      console.log("Thirty days = ");
      console.log(thirty);

      this.setState({
        thirtyDays: thirty,
        recaptureWindow: recapture,
        speedyTrial: speedy
      });
    }
    console.log(this.state);
  }

  addDays(date, days) {
    // var result = new Date(date);
    var tempDate = new Date(date);
    var result = new Date(
      tempDate.setTime(tempDate.getTime() + days * 86400000)
    );
    // result.setDate(result.getDate() + days);
    return result;
  }

  setArrestDate(newDate) {
    this.setState({ arrestDate: newDate }, () => {
      this.calculateDates();
    });
  }

  onTrialTypeChange(value) {
    console.log("TRIAL TYPE = " + value);
    this.setState({ trialType: value }, () => {
      this.calculateDates();
    });
  }

  render() {
    console.log(this.state.recaptureWindow != undefined);
    const showResults =
      this.state.recaptureWindow != undefined &&
      this.state.thirtyDays != undefined &&
      this.state.speedyTrial != undefined;

    console.log("show results = " + showResults);
    // let resultsArea = showResults ? (
    //   <View>
    //     <Text>
    //       Recapture Window: {this.state.recaptureWindow.toString().substr(4, 12)}
    //     </Text>
    //     <Text>
    //       Thirty Day: {this.state.thirtyDays.toString().substr(4, 12)}
    //     </Text>
    //     <Text>
    //       Speedy Trial Limit: {this.state.speedyTrial.toString().substr(4, 12)}
    //     </Text>
    //   </View>
    // ) : (
    //   ""
    // );

    return (
      <Container>
        <Content padder>
          <Header>
            <Text>Speedy Trial Calculator</Text>
          </Header>
          <Form style={styles.form}>
            <Item stackedLabel last style={styles.item}>
              <Label>Type of arrest</Label>

              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select Trial Type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  textStyle={{ color: "green" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.trialType}
                  onValueChange={this.onTrialTypeChange.bind(this)}
                >
                  <Picker.Item label="Misdemeanour" value="M" />
                  <Picker.Item label="Felony" value="F" />
                </Picker>
              </Item>
            </Item>
            <Item stackedLabel last>
              <Label>Date of arrest</Label>

              <DatePicker
                defaultDate={new Date()}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setArrestDate}
                disabled={false}
              />
            </Item>
            {showResults && (
              <View style={styles.results}>
                <Grid>
                  <Row>
                    <Col>
                      <Text style={styles.bold}>Recapture Window: </Text>
                    </Col>
                    <Col>
                      <Text style={styles.resultsText}>
                        {this.state.recaptureWindow.toString().substr(4, 12)}
                      </Text>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Text style={styles.bold}>Thirty Day: </Text>
                    </Col>
                    <Col>
                      <Text style={styles.resultsText}>
                        {this.state.thirtyDays.toString().substr(4, 12)}
                      </Text>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Text style={styles.bold}>Speedy Trial Limit: </Text>
                    </Col>
                    <Col>
                      <Text style={styles.resultsText}>
                        {this.state.speedyTrial.toString().substr(4, 12)}
                      </Text>
                    </Col>
                  </Row>
                </Grid>
              </View>
            )}
          </Form>
          <Text>
            Thanks for using this utility app. Simply change the date and trial
            type to recalculate relevant dates.
          </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    marginBottom: 30,
    marginTop: 20
  },
  form: {
    marginBottom: 50
  },
  footer: {
    margin: 25
  },
  resultsText: {
    fontSize: 11,
    color: "green"
  },
  bold: {
    fontSize: 11,
    fontWeight: "bold"
  },
  results: {
    marginTop: 30
  }
});
