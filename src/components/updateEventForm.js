import React from "react"
import useForm from 'react-hook-form'
import useGlobal from "../store/eventData";

const UpdateEventForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const [globalState, globalActions] = useGlobal();

  const updateEvent = data => {
    const stringData = JSON.stringify(data);
    globalActions.setEvent(stringData);
    console.log("updateEvent");
  };

  return (
    <div>
        <form id = "updateEvent"  onSubmit={handleSubmit(updateEvent)}>
          <label>Title</label>
          <input name="title" defaultValue={eventObj.title} ref={register} />
          <label>Location</label>
          <input
            name="location"
            ref={register}
            defaultValue={eventObj.location}
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

export default UpdateEventForm
