#import "EJProcess.h"
#import "EJConvert.h"

@implementation EJProcess;
    
- (void)helloWorld {
    
    //JSGlobalContextGroup must be created then a new JSGlobalContext must be diverged from it to create a new thread
    JSContextGroupRef ctxGroup = JSContextGroupCreate();
    JSContextRef ctx = JSGlobalContextCreateInGroup(ctxGroup, NULL);
    
    JSStringRef scriptJS = JSStringCreateWithUTF8CString("var j = 0;var z = 0;for(j;j<65535000;j+=1) {z=j*3;}");

    JSContextRef ctx2 = JSGlobalContextCreateInGroup(ctxGroup, NULL);
    
    JSEvaluateScript(ctx, scriptJS, NULL, NULL, NULL, NULL);
    JSEvaluateScript(ctx2, scriptJS, NULL, NULL, NULL, NULL);
 
    
    
}
    
    @end;