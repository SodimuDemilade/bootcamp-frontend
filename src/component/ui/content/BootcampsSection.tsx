import {MetricCard} from "@/component/ui/card/MetricCard.tsx";
import {Bootcamp} from "@/model/response/bootcamp/BootcampResponse.ts";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface BootcampsSectionProps {
    bootcamps: Bootcamp[];
    isLoading: boolean;
    onCreate: () => void;
    onOpen: (bootcampId: string) => void;
    onEdit: (bootcamp: Bootcamp) => void;
    onDelete: (bootcampId: string) => void;
}

export const BootcampsSection = ({
                                     bootcamps,
                                     isLoading,
                                     onCreate,
                                     onOpen,
                                     onEdit,
                                     onDelete,
                                 }: BootcampsSectionProps) => {

    const baseState = useSelector((state: RootState) => state.base);
    const totalCourses = bootcamps.reduce(
        (total, bootcamp) => total + (bootcamp.courses?.length ?? 0),
        0
    );

    const averageRating =
        bootcamps.length > 0
            ? bootcamps.reduce(
            (total, bootcamp) => total + (bootcamp.averageRating ?? 0),
            0
        ) / bootcamps.length
            : 0;

    return (
        <section className="adminSection">
            <div className="topbar">
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <h2>Bootcamps</h2>
                    <p>
                        Create and manage all bootcamps listed on the platform.
                    </p>
                </div>

                <button className="primaryBtn" onClick={onCreate}>
                    + Create Bootcamp
                </button>
            </div>

            <div className="metricsGrid">
                <MetricCard
                    title="Total Bootcamps"
                    value={bootcamps.length}
                />

                <MetricCard
                    title="Total Courses"
                    value={totalCourses}
                />

                <MetricCard
                    title="With Housing"
                    value={
                        bootcamps.filter(bootcamp => bootcamp.housing).length
                    }
                />

                <MetricCard
                    title="Average Rating"
                    value={Number(averageRating?.toFixed(1))}
                />
            </div>

            <div className="tableContainer">
                <div className="tableHeader">
                    <div>
                        <h3>Bootcamps</h3>
                        <p>{bootcamps.length} bootcamps</p>
                    </div>

                    <input
                        type="search"
                        placeholder="Search bootcamps..."
                        className="searchInput"
                    />
                </div>

                <div className={"usersTable"}>
                    <table className="usersTable">
                        <thead>
                        <tr>
                            <th>Bootcamp</th>
                            <th>Location</th>
                            <th>Courses</th>
                            <th>Rating</th>
                            <th>Publisher</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="tableLoading">
                                        Loading bootcamps...
                                    </div>
                                </td>
                            </tr>
                        ) : bootcamps.length === 0 ? (
                            <tr>
                                <td colSpan={6}>
                                    <div className="tableEmptyState">
                                        <h4>No bootcamps created</h4>

                                        <p>
                                            Create the first bootcamp to begin
                                            adding courses and accepting
                                            enrolments.
                                        </p>

                                        <button
                                            type="button"
                                            className="primaryBtn"
                                            onClick={onCreate}
                                        >
                                            Create Bootcamp
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            bootcamps.map(bootcamp => (
                                <tr key={bootcamp.id}>
                                    <td>
                                        <div className="bootcampTableInfo">
                                            <div className="bootcampInitial">
                                                {bootcamp.name.charAt(0)}
                                            </div>

                                            <div>
                                                <strong>{bootcamp.name}</strong>
                                                <span>{bootcamp.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        {bootcamp.address}
                                    </td>

                                    <td>
                                        <span className="courseCountBadge">
                                            {bootcamp.courses?.length ?? 0}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="ratingValue">
                                            ★{" "}
                                            {bootcamp.averageRating?.toFixed(1) ??
                                                "-"}
                                        </span>
                                    </td>

                                    <td>
                                        {/*{typeof bootcamp.user === "object"*/}
                                        {/*    ? bootcamp.user.name*/}
                                        {/*    : "Publisher"}*/}
                                        {baseState.users.find((user) => user._id == bootcamp.user)!.name}
                                    </td>

                                    <td>
                                        <div className="actions">
                                            <button
                                                className="manageBtn"
                                                onClick={() => onOpen(bootcamp.id)}
                                            >
                                                Manage
                                            </button>

                                            <button
                                                className="editBtn"
                                                onClick={() => onEdit(bootcamp)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="deleteBtn"
                                                onClick={() => onDelete(bootcamp.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};