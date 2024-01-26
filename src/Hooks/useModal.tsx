import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type ModalType = 'Edit' | 'Create' | 'Delete'
interface StoreState {
    modalType: ModalType
}

type Actions = {
    openModal: (type: ModalType) => void
    closeModal: () => void
}

const useModal = create<StoreState & Actions>()(
    immer((set) => ({
        modalType: 'Delete',
        openModal: (type) =>
            set((state) => {
                state.modalType = type
                setTimeout(() => {
                    const modale = document.getElementById('modale')

                    if (modale instanceof HTMLDialogElement) {
                        if (type === 'Delete') {
                            modale.showModal()
                        } else modale.show()
                    } else return
                }, 100)
            }),
        closeModal: () =>
            set(() => {
                const modale = document.getElementById('modale')

                if (modale instanceof HTMLDialogElement) modale.close()
                else return
            }),
    }))
)

export default useModal
