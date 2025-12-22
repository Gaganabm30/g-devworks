import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAchievements } from "../../api";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import AchievementCard from "../cards/AchievementCard";

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
padding: 40px 0px 80px 0px;
@media(max-width: 960px) {
  padding: 0px;
}
`;

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1100px;
gap: 12px;
@media(max-width: 960px) {
  flex-direction: column;
}
`;

const Title = styled.div`
font-size: 52px;
text-align: center;
font-weight: 600;
margin-top: 20px;
color: ${({ theme }) => theme.text_primary};
@media(max-width: 768px) {
  margin-top: 12px;
  font-size: 32px;
}
`;

const Desc = styled.div`
font-size: 18px;
text-align: center;
max-width: 600px;
color: ${({ theme }) => theme.text_secondary};
@media(max-width: 768px) {
  font-size: 16px;
}
`;

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    getAchievements().then((res) => {
      setAchievements(res.data);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <Container id="Achievements">
      <Wrapper>
        <Title>Achievements</Title>

        <VerticalTimeline>
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={`achievement-${index}`}
              achievement={achievement}
            />
          ))}
        </VerticalTimeline>
      </Wrapper>
    </Container >
  );
};

export default Achievements;
