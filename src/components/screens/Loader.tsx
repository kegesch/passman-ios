import React from "react";
import {Animated, Image, MaskedViewIOS, View, StyleSheet, StatusBar} from "react-native";
import DefaultColors from "../DefaultColors";
import {CenteredView} from "../StyledComponents";

interface ILoaderProps {
    children?: any;
    isLoading: boolean;
}

interface ILoaderState {
    loadingProgress: Animated.Value;
    animationDone: boolean;
}

export class Loader extends React.Component<ILoaderProps, ILoaderState> {

    constructor(props) {
        super(props);

        this.state = {
            loadingProgress: new Animated.Value(0),
            animationDone: false
        }
    }

    componentWillReceiveProps(nextProps: ILoaderProps) {
        if(!nextProps.isLoading && this.props.isLoading) {
            Animated.timing(this.state.loadingProgress, {
                toValue: 100,
                duration: 1000,
                useNativeDriver: true
            }).start(() => {
                this.setState({
                    animationDone: true
                })
            });
        }
    }

    render() {

        const opacityClearToVisible = {
            opacity: this.state.loadingProgress.interpolate({
                inputRange: [0, 15, 30],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
            }),
        };

        const imageScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [0, 10, 100],
                        outputRange: [1, 0.8, 140],
                    }),
                },
            ],
        };

        const appScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [0, 7, 100],
                        outputRange: [1.1, 1.03, 1],
                    }),
                },
            ],
        };

        const fullScreenBackgroundLayer = this.state.animationDone ? null : (
            <View style={[StyleSheet.absoluteFill, styles.fullScreenBlueLayer]} />
        );
        const fullScreenWhiteLayer = this.state.animationDone ? null : (
            <View style={[StyleSheet.absoluteFill, styles.fullScreenWhiteLayer]} />
        );

        const imageName = '../../../resources/app.png';

        const loadingView =
            <CenteredView style={{backgroundColor: DefaultColors.blue, flex: 1}}>
                <Image style={{width: 128, height: 128, margin: "auto"}} source={require(imageName)}/>
            </CenteredView>;

        if(this.props.isLoading) {
            return loadingView;
        } else {
            return (
                <View style={styles.fullScreen}>
                    <StatusBar animated={true} hidden={!this.state.animationDone} />
                    {fullScreenBackgroundLayer}
                    <MaskedViewIOS
                        style={{ flex: 1}}
                        maskElement={
                            <View style={styles.centeredFullScreen}>
                                <Animated.Image
                                    style={[styles.maskImageStyle, imageScale]}
                                    source={require(imageName)}
                                />
                            </View>
                        }
                    >
                        {fullScreenWhiteLayer}
                        <Animated.View style={[opacityClearToVisible, appScale, { flex: 1 }]}>
                            {this.props.children}
                        </Animated.View>
                    </MaskedViewIOS>
                </View>
        );
        }
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    maskImageStyle: {
        height: 128,
        width: 128,
    },
    centeredFullScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenWhiteLayer: {
        backgroundColor: DefaultColors.white,
    },
    fullScreenBlueLayer: {
        backgroundColor: DefaultColors.blue,
    }
});