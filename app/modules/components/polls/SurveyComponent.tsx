import React from "react";
import { ITheme, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "./themes/theme";
import "./index.css";
import {json} from "./api/json";

function SurveyComponent() {
    const survey = new Model(json);
    survey.applyTheme(themeJson as ITheme);
    survey.onComplete.add((sender) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    return (<Survey model={survey} />);
}

//test

export default SurveyComponent;