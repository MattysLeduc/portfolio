import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, MailOpen, Trash2, RefreshCw } from "lucide-react";
import { getAllMessages } from "@/features/contact/api/admin/getAllMessages";
import { markMessageRead } from "@/features/contact/api/admin/markMessageRead";
import { deleteMessage } from "@/features/contact/api/admin/deleteMessage";
import type { ContactMessageResponseModel } from "@/features/contact/models/ContactMessageResponseModel";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const MessagesForm = () => {
  const [messages, setMessages] = useState<ContactMessageResponseModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getAllMessages();
      setMessages(data);
    } catch {
      toast({ title: "Error", description: "Failed to load messages", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleMarkRead = async (messageId: string) => {
    try {
      await markMessageRead(messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId ? { ...msg, read: true } : msg
        )
      );
      toast({ title: "Success", description: "Message marked as read" });
    } catch {
      toast({ title: "Error", description: "Failed to mark message as read", variant: "destructive" });
    }
  };

  const handleDelete = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      setMessages((prev) => prev.filter((msg) => msg.messageId !== messageId));
      toast({ title: "Success", description: "Message deleted" });
    } catch {
      toast({ title: "Error", description: "Failed to delete message", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm text-primary uppercase tracking-wider">Contact Messages</h3>
        <Button variant="outline" size="sm" onClick={fetchMessages} className="border-primary/50">
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Collapsible
              key={msg.messageId}
              open={openItems.includes(msg.messageId)}
              onOpenChange={() => toggleItem(msg.messageId)}
            >
              <div className="bg-background/30 rounded-sm border border-primary/20 overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-primary/5">
                    <div className="flex items-center gap-3">
                      {msg.read ? (
                        <MailOpen size={18} className="text-muted-foreground" />
                      ) : (
                        <Mail size={18} className="text-primary" />
                      )}
                      <div>
                        <span className="font-mono text-sm font-semibold">
                          {msg.name} {!msg.read && <span className="text-primary">•</span>}
                        </span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {msg.email}
                        </span>
                        {msg.subject && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {msg.subject}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                      {openItems.includes(msg.messageId) ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="p-4 pt-0 space-y-4 border-t border-primary/10">
                    <div className="bg-background/50 p-4 rounded border border-primary/10">
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    <div className="flex justify-end gap-2">
                      {!msg.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkRead(msg.messageId)}
                          className="border-primary/50"
                        >
                          <MailOpen size={14} className="mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(msg.messageId)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesForm;
