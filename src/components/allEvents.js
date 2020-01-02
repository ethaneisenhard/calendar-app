import React from "react"
import useGlobal from "../store/eventData"

const AllEvents = props => {
  const [globalState, globalActions] = useGlobal()
  const { status, eventData } = globalState

  if(eventData.length === 0 && status === "INITIAL"){
    globalActions.getAllEventsByCommunity(props.community)
  }
  
  return (
    <section>
      {status === "LOADING" && <h4>Loading...</h4>}
      {status === "EMPTY" && <h4>This event has not been created</h4>}
      {status === "NOT_FOUND" && <h4>404 - Page Not Found</h4>}
      {status === "ERROR" && <h4>Connection Error</h4>}
      {status === "SUCCESS" && (
        <div>
          <pre>{JSON.stringify(eventData, null, 4)}</pre>
        </div>
      )}
    </section>
  )
}

export default AllEvents
