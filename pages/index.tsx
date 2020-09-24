import React from "react";
import { HomePage } from "../styles/global_emotion.styles";
import Title from "../components/Title/Title";
import Typo from "../components/Typo/Typo";
import {
	LandingTextWrapper,
	LandingImageWrapper,
	BottomOfPage,
} from "../styles/global_emotion.styles";
import { IconButton } from "@chakra-ui/core";
import { css } from "@emotion/core";

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
						<Typo p_text='The service which lets you track the progress of your projects and share it with a small link!' />
					</LandingTextWrapper>
					<LandingTextWrapper>
						<Title
							titleText="Whether you're an - Artist"
							tag='h1'
							style={{
								fontSize: "70px",
							}}
						/>
					</LandingTextWrapper>
					<LandingTextWrapper>
						<Typo p_text='You can use Overlook to track the progress of your art as you decide what it is that you are creating!' />
					</LandingTextWrapper>
					<LandingTextWrapper>
						<LandingImageWrapper>
							<img src={require("../static/svg/peep-sitting-12.svg")} />
						</LandingImageWrapper>
					</LandingTextWrapper>
					<LandingTextWrapper>
						<BottomOfPage>
							<IconButton
								aria-label='move page down'
								icon='arrow-down'
								variantColor='purple'
								isRound={true}
							/>
						</BottomOfPage>
					</LandingTextWrapper>
				</section>
			</HomePage>
		</>
	);
};

export default Home;
