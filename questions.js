Skip to content
0905dhruvshah
CCAF_MockTest
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Wiki
Security and quality
Insights
Settings
Files
Go to file
t
T
README.md
app.js
dashboard.css
index.html
landing.css
portal.js
questions.js
styles.css
vercel.json
CCAF_MockTest
/
questions.js
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing questions.js file contents
  1
  2
const QUESTIONS = [{"question":"After the web search agent and document analysis agent complete their\ntasks, the coordinator invokes the synthesis agent. However, the synthesis\nagent responds that it cannot complete the task because no research findings\nwere provided. What is the most likely cause of this issue?","options":{"A":"The synthesis agent needs tools that can fetch results directly from the other agents' conversation\nhistories.","B":"The synthesis agent's context window is not large enough to hold the combined outputs from both\nprevious agents.","C":"The subagents need to share a single API connection to enable automatic context sharing between\ninvocations.","D":"The coordinator did not include the outputs from the previous agents in the synthesis agent's\nprompt."},"answer":"D","justification":"The synthesis agent can only act on the information provided in its prompt. If prior outputs are not\npassed, it will report missing research findings."},{"question":"When researching \"renewable energy adoption,\" the web search agent\nreturns recent statistics (2024: 35% adoption) while the document analysis\nagent extracts data from internal reports (2022: 18% adoption). The synthesis\nagent incorrectly flags these as contradictory sources rather than recognizing\nthe data shows growth over time. What change would best enable the\nsynthesis agent to correctly interpret such temporal differences?","options":{"A":"Require subagents to include publication or data collection dates in their structured outputs.","B":"Instruct the synthesis agent to always treat the most recent data as authoritative and place older\nfindings in a separate historical appendix.","C":"Add a conflict resolution agent that automatically discards older data when newer data exists for the\nsame metric.","D":"Configure the web search agent to only return results from the past 6 months."},"answer":"A","justification":"Providing timestamps allows the synthesis agent to understand that the figures refer to different points\nin time, enabling it to interpret the data as a trend (growth) rather than a contradiction."},{"question":"Users report that final re

Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
 
