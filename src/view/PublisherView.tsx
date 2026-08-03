import './PublisherView.css';
import {BookOpen,} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useState} from "react";
import {BootcampModal} from "@/component/ui/modal/BootcampModal.tsx";
import {toastUtil} from "@/util/toastUtil.ts";
import {BootcampService} from "@/service/BootcampService.ts";
import {AppDispatch} from "@/configs/storeConfig.ts";
import {baseStore} from "@/store/baseStore.ts";
import {CreateBootcamp} from "@/model/response/bootcamp/CreateBootcampResponse.ts";
import {CreatorBootcampPage} from "@/component/ui/content/CreatorBootcampPage.tsx";

export function PublisherView() {
    const dispatch = useDispatch<AppDispatch>();
    const baseState = useSelector((state: RootState) => state.base);
    const authState = useSelector((state: RootState) => state.auth);
    const bootcamp = baseState.bootcamps.find(bootcamp => bootcamp.user === authState.userInfo._id);
    const [bootcampOpen, setBootcampOpen] = useState<boolean>(false);
    const [createBootcamp, {isLoading}] = BootcampService.useCreateBootcampMutation();

    const submitBootcamp = async (data: CreateBootcamp) => {
        const response = await createBootcamp(data);
        if (!response.error) {
            toastUtil.showUniqueToast("Successful Bootcamp", "Bootcamp Successfully added!", "success");
            dispatch(baseStore.mutation.addBootcamp(response.data!.data));
        }
    }


    return (
        !bootcamp ?
            <section className="publisherEmptyState">
                <div className="emptyStateIcon">
                    <BookOpen size={28}/>
                </div>

                <p className="publisherLabel">Start publishing</p>

                <h2>Create your bootcamp</h2>

                <p>
                    Add your bootcamp information, courses, pricing, career
                    outcomes, and enrollment details.
                </p>

                <button className="viewPublicButton" onClick={() => setBootcampOpen(true)}>
                    Create Bootcamp
                </button>

                <span>
        Each publisher account may create one bootcamp.
    </span>

                {bootcampOpen &&
                    <BootcampModal
                        // open={bootcampOpen}
                        onClose={() => setBootcampOpen(false)}
                        loading={isLoading}
                        onSubmit={submitBootcamp}
                    />
                }
            </section> :
            <CreatorBootcampPage bootcampId={bootcamp.id}/>
    );
}