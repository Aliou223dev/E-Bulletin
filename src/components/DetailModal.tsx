import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, User, Mail, Phone, Calendar, Hash } from "lucide-react";

interface DemandeDetails {
     id:string;
     name:string;
     surname:string;
     matricule:string;
     nina:string;
     phone:string;
     birthDate:string;
     email:string;
     adhesionStatus:string;
}

interface DetailModalProps {
  demande: DemandeDetails | null;
  isOpen: boolean;
  onClose: () => void;
 onApprove: (adhesionId: string) => Promise<void>; // Updated to match your usage
  onReject: (adhesionId: string) => Promise<void>; // Updated to match your usage
}

export function DetailModal({ demande, isOpen, onClose, onApprove, onReject }: DetailModalProps) {
  if (!demande) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Détails de la demande d'adhésion</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{demande.surname}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {demande.adhesionStatus}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Matricule</p>
                      <p className="font-medium">{demande.matricule}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{demande.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{demande.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date de naissance</p>
                      <p className="font-medium">
                        {new Date(demande.birthDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Numéro NINA</p>
                      <p className="font-medium">{demande.nina}</p>
                    </div>
                  </div>

                  {/* <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date de demande</p>
                      <p className="font-medium">
                        {new Date(demande.dateDemande).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>

          {demande.adhesionStatus === "En attente" && (
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline"
                onClick={onClose}
              >
                Fermer
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  onReject(demande.id);
                  onClose();
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Rejeter
              </Button>
              <Button 
                onClick={() => {
                  onApprove(demande.id);
                  onClose();
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Check className="h-4 w-4 mr-2" />
                Approuver
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
//${(data.dateGeneration)?string("dd.MM.yyyy")}