import React from "react"
import useForm from 'react-hook-form'
import useGlobal from "../store/eventData";

const CreateEventForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const [globalState, globalActions] = useGlobal();

  const createEvent = data => {
    const stringData = JSON.stringify(data);
    globalActions.setEvent(stringData);
    console.log("createEvent");
  };

  return (
   <div>
      <form id = "createEvent" onSubmit={handleSubmit(createEvent)}>
        <label>Title</label>
        <input name="title" defaultValue="" ref={register} />
        <label>Location</label>
        <input
          name="location"
          defaultValue=""
          ref={register}
        />
        {errors.exampleRequired && <p>This field is required</p>}
        <input type="submit" />
      </form>
     
      <h3>Data Response</h3>
      <pre>
        {globalState.eventData}
      </pre>
   </div>
  )
}

export default CreateEventForm
