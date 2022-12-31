/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Stack } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Loading from '../common/Loading'

export default function ModalParent (props: {
  open: boolean
  toogleOpen: (open: boolean) => void
  title: string
  children: React.ReactNode
  handleSubmit?: () => void
  loading?: boolean
}) {
  return (
    <Modal
      show={props.open}
      onHide={() => props.toogleOpen(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>

          <Stack direction="horizontal" gap={2}>
            {(props.loading ?? false)
              ? <Loading />
              : (props.handleSubmit !== null)
                  ? <Button onClick={props.handleSubmit}>Submit</Button>
                  : <></>
            }

            <Button variant='danger' onClick={() => props.toogleOpen(false)}>Close</Button>
          </Stack>
      </Modal.Footer>
    </Modal>
  )
}
