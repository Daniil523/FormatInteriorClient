import './Modal.css'

function Modal({ active, setActive, children, ClearForm = () => {} }) {
  return (
    <div
      className={active ? 'Modal Active' : 'Modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'Modal__content Active' : 'Modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="Modal__closing">
          <span
            onClick={() => {
              setActive(false)
              ClearForm()
            }}
          >
            &#10006;
          </span>
        </div>
        <div className="Modal__content_text">{children}</div>
      </div>
    </div>
  )
}

export default Modal
