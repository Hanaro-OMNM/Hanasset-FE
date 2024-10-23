import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface CenterCircularProgressProps {
  isConfirmProgressing: boolean;
}

export default function CenterCircularProgress({
  isConfirmProgressing,
}: CenterCircularProgressProps) {
  return (
    <Transition show={isConfirmProgressing} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="flex items-center justify-center min-h-screen bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      </Dialog>
    </Transition>
  );
}
