import { useAllNodes } from "@/contexts/AllNodesContext";
import { useAscendancy } from "@/contexts/AscendancyContext";
import { useNodes } from "@/contexts/NodesContext";
import { useEffect, useState } from "react";

interface LeftSidebarProps {
}

export default function Header({ }: LeftSidebarProps) {
  const { allNodes } = useAllNodes();
  const { selectedNodes, setDisplayedNodes} = useNodes();
  const {ascendancy,characterClass } = useAscendancy();
  
  const [hideSmallPassives, setHideSmallPassives] = useState<boolean>(false);
  const [hideNoStatPassives, setHideNoStatPassives] = useState<boolean>(false);
  const [hideNoSelectPassives, setHideNoSelectPassives] = useState<boolean>(false);
  const [hideAttrPassives, setHideAttrPassives] = useState<boolean>(false);

  
    const onHideSmallChange = (checked: boolean) => {
      setHideSmallPassives(checked);
    };
  
    const onHideNoStatChange = (checked: boolean) => {
      setHideNoStatPassives(checked);
    };

    const onHideNoSelectChange = (checked: boolean) => {
      setHideNoSelectPassives(checked);
    };

    const onHideAttrChange = (checked: boolean) => {
      setHideAttrPassives(checked);
    };




  useEffect(() => {
      const newDisplayedNodes = Array.from(allNodes.values())
        .filter((node) => {
          if (hideSmallPassives && node.type === "small") return false;
  
          if (hideNoStatPassives && node.stats.length === 0 && !selectedNodes.has(node.id)) return false;

          if (hideNoSelectPassives && !selectedNodes.has(node.id)) return false;

          if (hideAttrPassives && (node.name?.toLowerCase().includes('attribute'.toLowerCase()))) return false;
  
          return true;
        })
        .filter((node) => {

          const baseId = node.id.split('-')[0];

          if(node.id.toLowerCase() == `${baseId.toLowerCase()}-${ascendancy.toLowerCase()}`) return true;

          if(node.id == `${baseId}-${characterClass.toLowerCase()}`) return true;

          if(node.id == baseId && !allNodes.has(`${baseId}-${characterClass.toLowerCase()}`)) return true;

          return false;
        })
        .map((node) => node.id);
      
      setDisplayedNodes(new Set(newDisplayedNodes));
    }, [allNodes, hideSmallPassives, hideNoStatPassives, hideNoSelectPassives, hideAttrPassives, ascendancy, setDisplayedNodes]);

    

  return (

    <div className="absolute top-[50px] left-0 flex flex-col bg-gray-700 p-3 space-x-0 w-[200px]">
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hideSmallPassives}
            onChange={(e) => onHideSmallChange(e.target.checked)}
            className="mr-2"
          />
          Hide small
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hideNoStatPassives}
            onChange={(e) => onHideNoStatChange(e.target.checked)}
            className="mr-2"
          />
          Hide unidentified
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hideNoSelectPassives}
            onChange={(e) => onHideNoSelectChange(e.target.checked)}
            className="mr-2"
          />
          Hide non-selected
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hideAttrPassives}
            onChange={(e) => onHideAttrChange(e.target.checked)}
            className="mr-2"
          />
          Hide attributes
        </label>
        <label className="flex items-center">
                  <a 
    href="https://example.com/large" 
    className="hidden lg:inline text-blue-600 underline">Github</a>
        </label>

      
      </div>
    </div>
  )
}
