import {useState} from "react";
import {BootcampsSection} from "@/component/ui/content/BootcampsSection.tsx";
import {BootcampModal} from "@/component/ui/modal/BootcampModal.tsx";
import {toastUtil} from "@/util/toastUtil.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {BootcampService} from "@/service/BootcampService.ts";
import {baseStore} from "@/store/baseStore.ts";
import {CreateBootcamp} from "@/model/response/bootcamp/CreateBootcampResponse.ts";
import {useNavigate} from "react-router-dom";

export const AdminBootcampsView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const baseState = useSelector((state: RootState) => state.base);
    const authState = useSelector((state: RootState) => state.auth);
    const [showBootcampModal, setShowBootcampModal] = useState(false);
    const bootcamps = baseState.bootcamps.filter(bootcamp => bootcamp.user === authState.userInfo._id);
    const [createBootcamp, {isLoading: creatingBootcamp}] = BootcampService.useCreateBootcampMutation();
    const [deleteBootcamp] = BootcampService.useDeleteBootcampMutation();


    const handleOpenBootcamp = (bootcampId: string) => {
        navigate(`/admin/bootcamps/${bootcampId}`);
    };

    const deleteBootcampAction = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bootcamp?"
        );

        if (confirmDelete) {
            await deleteBootcamp(id);
            dispatch(baseStore.mutation.removeBootcamp(id));
        }
    }

    const handleCreateBootcamp = async (data: CreateBootcamp) => {
        const response = await createBootcamp(data);
        if (!response.error) {
            toastUtil.showUniqueToast("Successful Bootcamp", "Bootcamp Successfully added!", "success");
            dispatch(baseStore.mutation.addBootcamp(response.data!.data));
        }
    }


    return (
        <>
            <BootcampsSection
                bootcamps={bootcamps}
                isLoading={false}
                onCreate={() => setShowBootcampModal(true)}
                onOpen={handleOpenBootcamp}
                onEdit={() => setShowBootcampModal(true)}
                onDelete={deleteBootcampAction}
            />

            {showBootcampModal && (
                <BootcampModal
                    open={showBootcampModal}
                    loading={creatingBootcamp}
                    onClose={() => setShowBootcampModal(false)}
                    onSubmit={handleCreateBootcamp}
                />
            )}
        </>
    )
}