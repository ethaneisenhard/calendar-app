import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions/eventDataAction";

const initialState = {
  eventData: []
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
