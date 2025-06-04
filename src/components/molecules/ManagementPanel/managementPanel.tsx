import { useState } from "react";

import { CityEntity } from "@/common/entities/city";
import useGetCityById from "@/hooks/queries/useGetCityBtId";
import useProfile from "@/hooks/queries/useProfile";
import useAuth from "@/hooks/useAuth";

import AICard from "../AICard/AICard";
import EditPanelCard from "../EditPanelCard/editPanelCard";
import PanelCard from "../PanelCard/panelCard";
import PMECard from "../PMECard/PMECard";

export default function ManagementPanel() {
  const [isEdit, setIsEdit] = useState(false);
  const { userUid } = useAuth();
  const { data: user } = useProfile(userUid);
  const { data: city } = useGetCityById(user?.cityId || "");

  if (!isEdit)
    return (
      <div className="flex h-full w-full flex-col justify-between gap-20">
        <div className="flex w-full">
          <div className="flex w-full">
            <PanelCard
              imageUrl={city?.cityImageUrl || ""}
              cityName={city?.name || ""}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </div>
          <div className="flex w-full">
            <AICard />
          </div>
        </div>
        <PMECard isEdit={isEdit} cityId={city?.id || ""} />
      </div>
    );

  if (isEdit)
    return (
      <div className="flex h-full w-full justify-center">
        <div className="flex w-3/5">
          <EditPanelCard
            city={city as CityEntity}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        </div>
        <div className="flex w-full flex-col gap-14">
          <AICard />
          <PMECard isEdit={isEdit} cityId={city?.id || ""} />
        </div>
      </div>
    );
}
