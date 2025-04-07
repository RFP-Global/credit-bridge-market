
import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScoreThreshold } from "./types";

export const AlgorithmSettings = () => {
  // Initial thresholds state
  const [thresholds, setThresholds] = useState([
    { id: "high", label: "Low Risk Threshold", value: 4.5, color: "#10b981" }, // green-500
    { id: "moderate", label: "Moderate Risk Threshold", value: 3.5, color: "#3b82f6" }, // blue-500
    { id: "medium", label: "Medium-High Risk Threshold", value: 2.5, color: "#eab308" }, // yellow-500
    { id: "low", label: "High Risk Threshold", value: 0, color: "#ef4444" }, // red-500
  ]);

  const handleThresholdChange = (id: string, value: number) => {
    setThresholds(prev => 
      prev.map(threshold => 
        threshold.id === id ? { ...threshold, value } : threshold
      )
    );
  };

  const handleColorChange = (id: string, color: string) => {
    setThresholds(prev => 
      prev.map(threshold => 
        threshold.id === id ? { ...threshold, color } : threshold
      )
    );
  };

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
                {thresholds.map(threshold => (
                  <div key={threshold.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: threshold.color }}
                      ></div>
                      <span className="text-sm">{threshold.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={threshold.value}
                        onChange={(e) => handleThresholdChange(threshold.id, parseFloat(e.target.value))}
                        className="w-16 h-8 text-xs"
                        step="0.1"
                        min="0"
                        max="5"
                      />
                      <Input
                        type="color"
                        value={threshold.color}
                        onChange={(e) => handleColorChange(threshold.id, e.target.value)}
                        className="w-8 h-8 p-1"
                      />
                    </div>
                  </div>
                ))}
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
