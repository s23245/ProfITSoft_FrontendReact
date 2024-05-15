import React, { useMemo } from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import HeroDetails from './containers/HeroDetails';
import configureStore from "../../misc/redux/configureStore";
import {Provider} from "react-redux";
import heroEntityReducer from "./reducers/heroEntity";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    heroEntity: heroEntityReducer,
    });
const store = configureStore(rootReducer);

function Index(props)
{
  const {
    lang,
  } = useLocationSearch();

  const messages = useMemo(() => getMessages(lang), [lang]);

  return (
      <Provider store={store}>
        <IntlProvider messages={messages}>
          <HeroDetails {...props} />
        </IntlProvider>
    </Provider>
  );
}

export default Index;
