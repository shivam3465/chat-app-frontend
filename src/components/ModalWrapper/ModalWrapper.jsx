import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";

const ModalWrapper = ({ children, isOpen, setIsOpen }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<Transition
				show={isOpen}
				enter="duration-400 ease-in"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="duration-200 ease-out"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<Dialog
					onClose={() => dispatch(setIsOpen(false))}
					className="relative z-50 transition">
					<div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-[#4c4b4b48]">
						<DialogPanel className="max-w-lg space-y-4 border min-w-[20rem] sm:min-w-[25rem] shadow-shadowCard bg-white rounded-[10px]">
							{children}
						</DialogPanel>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default ModalWrapper;
