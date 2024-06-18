
import "./styles.css";
import { machine } from "./machine";
import { interpret } from "xstate";

document.querySelector("#app").innerHTML = `
<a href="https://stately.ai/studio?rel=stackblitz" rel="external" target="_blank"><img src="https://stately.ai/logo-black.svg" width="200" /></a>
<h1>XState <sup>v4</sup> JavaScript template</h1>
<hr />
<h2 id="machine-name">game</h2>
<h3>State value</h3>
<h3><code id="state"></code></h3>
<div id="events-container">
  <h3 id="events-title">EVENTS</h3>
  <div id="events"></div>
  <p id="no-events-text">No events to send</p>
</div>
<h3>Context</h3>
<code><pre id="context"></pre></code>
<hr />
<p>
  Open the console to see the state transitions from the created <code>actor</code>
</p>
<p>
  You can also send events in the console via <code>actor.send({ type: 'someEvent' })</code>
</p>
<p>
  <a href="https://stately.ai/studio/editor/fce2f8b0-e177-48a6-926a-a4559cf07c38?mode=design&machineId=4f667631-9d1c-4f80-b3c3-a6ab7f57dc8a&rel=stackblitz" rel="external" target="_blank">🚀 View in Stately Studio</a>
  <br /><br />
  <a href="https://stately.ai/docs?rel=codesandbox" rel="external" target="_blank">📘 XState documentation</a>
</p>
`;
const actor = interpret(machine);
window.actor = actor;
actor.subscribe((state) => {
  const stateValueString = state.configuration
    .filter((s) => s.type === 'atomic' || s.type === 'final')
    .map((s) => s.id)
    .join(', ')
    .split('.')
    .slice(1)
    .join('.');
  // Machine State value
  document.querySelector("#state").outerHTML = `<code id="state">${stateValueString}</code>`
  
  // Machine context
  document.querySelector('#context').innerHTML = JSON.stringify(
    state.context ?? {},
    null,
    2
  );

  console.log(
    `%cState value:%c ${state.value}`,
    "background-color: #056dff",
    "background-color: none"
    );
  console.log(
    `%cState:%c ${JSON.stringify(state, null, 2)}`,
    "background-color: #056dff",
    "background-color: none"
    );
  console.log(
    `%cNext events:%c ${state.nextEvents.map((eventType, i) => i > 0 ? ' ' + eventType : eventType)}`,
    "background-color: #056dff",
    "background-color: none"
    );


  // create a button for each state event
  const eventsList = document.querySelector("#events");
  eventsList.innerHTML = "";
  state.nextEvents.forEach((eventType) => {
    if (eventType.startsWith('xstate.')) return;
    const button = document.createElement("button");
    if (!state.can(eventType)) {
      button.disabled = true;
    }
    button.innerText = eventType;
    button.onclick = () => {
      actor.send({ type: eventType });
    };
    eventsList.appendChild(button);
    return button;
  });

  if (state.nextEvents.length === 0) {
    document.querySelector("#no-events-text").classList.add('show');
  }
});
actor.start();
