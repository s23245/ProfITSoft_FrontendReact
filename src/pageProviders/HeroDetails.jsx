import React from 'react';
import PageContainer from './components/PageContainer';
import HeroDetails from "../pages/heroDetails";

const heroDetails = (props) => {
    return (
        <PageContainer>
            <HeroDetails {...props}/>
        </PageContainer>
    );
};

export default heroDetails;