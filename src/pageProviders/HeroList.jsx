import React from 'react';
import PageContainer from './components/PageContainer';
import HeroList from 'pages/heroList';

const heroList = (props) => {
    return (
        <PageContainer>
            <HeroList {...props} />
        </PageContainer>
    );
};

export default heroList;