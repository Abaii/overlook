import React from "react";
import { HomePage } from "../styles/global_emotion.styles";
import Title from "../components/Title/Title";
import Typo from "../components/Typo/Typo";
import {
	LandingTextWrapper,
	LandingImageWrapper,
} from "../styles/global_emotion.styles";

const Home = () => {
	return (
		<>
			<HomePage>
				<section>
					<LandingTextWrapper>
						<Title
							titleText='Welcome to Overlook'
							tag='h1'
							style={{
								fontSize: "90px",
							}}
						/>
					</LandingTextWrapper>
					<LandingTextWrapper>
						<LandingImageWrapper>
							<img src={require("../static/svg/Timeline.svg")} />
						</LandingImageWrapper>
					</LandingTextWrapper>
					<LandingTextWrapper>
						<Typo p_text='The service which lets you track the progress of your projects and share it when with a small link!' />
					</LandingTextWrapper>
				</section>
			</HomePage>
		</>
	);
};

export default Home;
