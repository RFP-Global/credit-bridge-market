
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AlgorithmSettings = () => {
  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader>
        <CardTitle className="text-sm font-mono">ALGORITHM SETTINGS</CardTitle>
        <CardDescription>
          Configure global settings for the risk assessment algorithm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="font-medium">Risk Threshold Settings</div>
              <div className="grid gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Low Risk Threshold</span>
                  </div>
                  <div className="text-sm">≥ 4.5</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Moderate Risk Threshold</span>
                  </div>
                  <div className="text-sm">≥ 3.5</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Medium-High Risk Threshold</span>
                  </div>
                  <div className="text-sm">≥ 2.5</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">High Risk Threshold</span>
                  </div>
                  <div className="text-sm">&lt; 2.5</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-medium">Auto-Reject Settings</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm" htmlFor="auto-reject">Auto-reject applications below score</label>
                  <select id="auto-reject" className="h-9 bg-background border border-input rounded-md px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>2.5</option>
                    <option>3.0</option>
                    <option>3.5</option>
                    <option>None</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm" htmlFor="auto-approve">Auto-approve applications above score</label>
                  <select id="auto-approve" className="h-9 bg-background border border-input rounded-md px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option>None</option>
                    <option>4.0</option>
                    <option>4.5</option>
                    <option>4.8</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="font-medium">Algorithm Version Control</div>
            <div className="flex items-center justify-between p-3 border border-gray-800 rounded-md">
              <div>
                <div className="font-medium">Current Version: v3.0</div>
                <div className="text-sm text-muted-foreground">Last updated: December 15, 2023</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Export Configuration</Button>
                <Button variant="outline" size="sm">Import Configuration</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8 space-x-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
