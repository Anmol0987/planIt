// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "../ui/button";
// export default function AddPollDialog({isOpen,setIsOpen}){
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Create a Poll</DialogTitle>
//       </DialogHeader>

//       <div className="space-y-4 mt-2">
//         <div>
//           <label className="text-sm font-medium">Question</label>
//           <Input
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//             placeholder="Where should we go?"
//             className="mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">Options</label>
//           {newOptions.map((opt, i) => (
//             <Input
//               key={i}
//               value={opt}
//               onChange={(e) => setNewOptions((arr) => arr.map((v, idx) => idx === i ? e.target.value : v))}
//               placeholder={`Option ${i + 1}`}
//               className="mt-2"
//             />
//           ))}
//           <Button variant="ghost" size="sm" onClick={() => setNewOptions([...newOptions, ""])} className="mt-2">
//             + Add option
//           </Button>
//         </div>
//       </div>

//       <DialogFooter className="mt-4">
//         <Button onClick={createPoll}>Create</Button>
//         <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
//       </DialogFooter>
//     </DialogContent>
//   </Dialog>
// }