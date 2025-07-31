import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Link, MessageSquare } from "lucide-react";

// Declare chrome types for extension
declare global {
  interface Window {
    chrome?: any;
  }
}

const Index = () => {
  const openDribbbleMessages = () => {
    if (typeof window !== 'undefined' && window.chrome?.tabs) {
      window.chrome.tabs.create({ url: 'https://dribbble.com/messages' });
    } else {
      window.open('https://dribbble.com/messages', '_blank');
    }
  };

  const testExtension = () => {
    // Test if we can access chrome.tabs
    if (typeof window !== 'undefined' && window.chrome?.tabs) {
      console.log('Extension has proper permissions');
      alert('Extension is working correctly!');
    } else {
      console.log('Extension needs to be loaded in Chrome');
      alert('Please load this extension in Chrome browser');
    }
  };

  return (
    <div className="w-80 p-4 bg-background">
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg">Dribbble Link Alert</CardTitle>
          </div>
          <CardDescription>
            Monitors your Dribbble messages for shared links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">Extension is active</span>
            <Badge variant="secondary" className="ml-auto">v1.0.0</Badge>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              How it works:
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1 ml-6">
              <li>• Monitors Dribbble message inputs</li>
              <li>• Detects when you type or paste URLs</li>
              <li>• Shows warning notifications</li>
              <li>• Works only on dribbble.com/messages</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={openDribbbleMessages}
              className="w-full"
              size="sm"
            >
              <Link className="h-4 w-4 mr-2" />
              Open Dribbble Messages
            </Button>
            
            <Button 
              onClick={testExtension}
              variant="outline"
              className="w-full"
              size="sm"
            >
              Test Extension
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            💡 Go to Dribbble messages and try typing a URL like "https://example.com" to see the alert in action.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
