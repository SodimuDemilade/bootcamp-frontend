import {useNavigate, useParams} from "react-router-dom";
import {CreatorBootcampPage} from "@/component/ui/content/CreatorBootcampPage.tsx";

export const AdminBootcampView = () => {
    const navigate = useNavigate();

    const {bootcampId} = useParams<{
        bootcampId: string;
    }>();

    // const {data, isLoading, isError} =
    //     BootcampService.useReadSingleBootcampQuery(
    //         bootcampId
    //             ? {bootcampId}
    //             : skipToken
    //     );
    //
    // if (isLoading) {
    //     return <p>Loading bootcamp...</p>;
    // }
    //
    // if (isError || !data?.data) {
    //     return <p>Bootcamp not found.</p>;
    // }

    return (
        <CreatorBootcampPage
            bootcampId={bootcampId || ""}
            onBack={() => navigate("/admin/bootcamps")}
        />
    );
};