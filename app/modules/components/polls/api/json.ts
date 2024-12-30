export const json = {
  "title": "TWU 229 Monthly Poll",
  "description": "ends 12/25/24",
  "logo": "https://api.surveyjs.io/private/Surveys/files?name=7e6959bc-3c34-410a-90fc-f1cebd7933f7",
  "logoHeight": "300px",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "radiogroup",
          "name": "question1",
          "title": "On a scale of 1 to 5, how satisfied are you with your unions performance lately?",
          "choices": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ]
        },
        {
          "type": "text",
          "name": "question2"
        }
      ]
    }
  ],
  "triggers": [
    {
      "type": "runexpression"
    }
  ]
}